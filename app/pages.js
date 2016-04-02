import errorHandler from './errorhandler'
export default function (node_Id) {
  $.getJSON('/tests/pages.json',json => {
    if(errorHandler(node_Id, json)){
      return;
    }
    console.log(json);
    var $pages = $('#' + node_Id);
    var rootUrl, title, screenshotUrl, page;

    rootUrl = "http://decode-2016.pagecloud.io/"

    for (let i = 0; i < json.data.pages.length; i++) {
      console.log(json.data.pages[i].name);
      screenshotUrl = rootUrl + getScreenshot(json.data.pages[i].name);
      page = '<div class="pageDiv col-md-2"><div class="pageTitle">' + json.data.pages[i].name + '</div><div class="pageScreenshot"><img src="' + screenshotUrl + '"></div></>';
      $pages.append(page);
    }

    function getScreenshot(name) {
      return "page_thumbnails/" + name + "_small.jpg";
    }

  });
}
