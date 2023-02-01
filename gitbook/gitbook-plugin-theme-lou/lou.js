require(['gitbook', 'jquery'], function (gitbook, $) {
  // 标题自动编号
  function autoNumber(titles) {
    // 不自动编号，则不显示
    if ($('#hidden-autonumber').length > 0) {
      return;
    }
    // index 1~5 依次是 1~5级标题
    let numberStack = [0, 0, 0, 0, 0, 0];
    let lastLevel; // 上一次的标题级数
    $('.page-inner .markdown-section')
      .find(titles.join(','))
      .each(function () {
        if ($(this).hasClass('no-number')) return;
        const title = $(this).text();
        let curLevel;
        if ($(this).is('h1')) {
          curLevel = 1;
        } else if ($(this).is('h2')) {
          curLevel = 2;
        } else if ($(this).is('h3')) {
          curLevel = 3;
        } else if ($(this).is('h4')) {
          curLevel = 4;
        } else if ($(this).is('h5')) {
          curLevel = 5;
        }
        numberStack[curLevel]++; // 当前级数加1
        let titleNumber = []; // 标题编号
        for (let i = 1; i <= curLevel; i++) {
          titleNumber.push(numberStack[i]);
        }
        $(this).text(`${titleNumber.join('.')} ${title}`);
        $(this).attr('id', `${titleNumber.join('_')}_${title}`);
        if (curLevel < lastLevel) {
          for (let i = curLevel + 1; i < numberStack.length; i++) {
            numberStack[i] = 0;
          }
        }
        lastLevel = curLevel;
      });
  }
  // 生成内容导航
  function generateSectionNavigator() {
    // 不自动编号，则不显示
    if ($('#hidden-autonumber').length > 0) {
      $('.book-anchor').css('display', 'none');
      $('.page-inner').css('padding', '20px 40px 20px 40px');
      $('.page-inner').css('max-width', '780px');
      return;
    }
    $('.page-inner .markdown-section')
      .find('h1,h2,h3')
      .each(function () {
        if ($(this).hasClass('no-number')) return;
        var cls = 'anchor-h1';
        if ($(this).is('h2')) {
          cls = 'anchor-h2';
        }
        if ($(this).is('h3')) {
          cls = 'anchor-h3';
        }
        var text = $(this).text();
        var href = $(this).attr('id');
        $('.book-anchor-body').append(
          "<a id='an_" +
            text +
            "' class='anchor-text " +
            cls +
            "' title='" +
            text +
            "'  href='#" +
            href +
            "'>" +
            text +
            '</a>'
        );
      });

    $('.book-anchor-title').click(function () {
      // $(".book-anchor-body").toggle();
    });

    $('.book-anchor-body>a').click(function (e) {
      e.preventDefault();
      $('.book-anchor-body>a').removeClass('selected');
      $(this).addClass('selected');
      let idSelector = $.attr(this, 'href').split('#')[1];
      let clickElement = document.getElementById(idSelector);

      // 获取当前元素margin-top值
      var computedStyle = getComputedStyle(clickElement, null);
      let marginTop = +computedStyle.marginTop.split('px')[0];
      $('.body-inner').animate(
        {
          scrollTop: clickElement.offsetTop + marginTop,
        },
        400
      );
    });

    //获取hash值定向到指定位置
    var hash = decodeURIComponent(location.hash);
    if (hash) {
      hash = hash.substring(1);
      $('#an_' + hash).addClass('selected');
    }
  }

  // 基础设置
  function setInit() {
    let i18nConfig = {
      'zh-cn': {
        BookSummary: '目录',
        SearchText: '搜索',
        SearchTips: '输入关键词查找',
        ArticleSection: '本篇章节：',
        ReservedRights: '版权所有',
      },
      en: {
        BookSummary: 'Summary',
        SearchText: 'Search',
        SearchTips: 'Input keywords to search',
        ArticleSection: 'Article Section:',
        ReservedRights: 'All Rights Reserved',
      },
    };
    const themeConfig = gitbook.state.config.pluginsConfig['theme-lou'] || {};
    const i18n =
      themeConfig.lang && i18nConfig[themeConfig.lang]
        ? i18nConfig[themeConfig.lang]
        : i18nConfig['zh-cn'];
    // 标题
    var $title = $('.header-inner .title');
    $title.text(gitbook.state.config.title);

    $('.book-summary-title').text(
      themeConfig['book-summary-title'] || i18n['BookSummary']
    );
    $('.book-anchor-title').text(
      themeConfig['book-anchor-title'] || i18n['ArticleSection']
    );

    // 搜索框
    var $search = $('#book-search-input');
    var placeholder = themeConfig['search-placeholder'] || i18n['SearchTips'];
    $search.find('input').attr('placeholder', placeholder);
    $search.append(`<span id='searchBtn'>${i18n['SearchText']}</span>`);
    $search.focus();
    $('#searchBtn').click(function (e) {});

    // 标题自动编号
    if (
      themeConfig['autoNumber'] &&
      themeConfig['autoNumber'] > 0 &&
      themeConfig['autoNumber'] <= 5
    ) {
      let titles = [];
      for (let i = 1; i <= themeConfig['autoNumber']; i++) {
        titles.push(`h${i}`);
      }
      autoNumber(titles);
    }
    // 隐藏的元素
    if (themeConfig['hide-elements'].length) {
      themeConfig['hide-elements'].forEach(function (elem) {
        $(elem).hide();
      });
    }
    // 底部版权
    if (themeConfig['copyright']) {
      let text = '';
      if (themeConfig['copyright']['text']) {
        text = themeConfig['copyright']['text'];
      } else {
        var now = new Date();
        var year = now.getFullYear();
        text = `Copyright © ${year} ${themeConfig['copyright']['author']} ${i18n['ReservedRights']}`;
      }
      $('.page-inner .copyright').append(text);
    }
  }

  gitbook.events.on('start', function () {});

  gitbook.events.on('page.change', function () {
    setInit();
    generateSectionNavigator();
  });
});
