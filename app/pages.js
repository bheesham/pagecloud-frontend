import errorHandler from './errorhandler'
import sortByKey from './sortByKey'
export default function (node_Id) {
  $.getJSON('/tests/pages.json',json => {
    if(errorHandler(node_Id, json)){
      return;
    }
    sortByKey(json.data.pages,'count');
    var $pages = $('#' + node_Id);
    var rootUrl, title, screenshotUrl, page, maxCount, pageJSON;

    pageJSON = json.data.pages;
    maxCount = json.data.pages[0].count;
    rootUrl = "http://decode-2016.pagecloud.io/"

    for (let i = 0; i < pageJSON.length; i++) {
      console.log("counting");
      console.log(pageJSON[i].count);
      console.log(maxCount);
      screenshotUrl = rootUrl + getScreenshot(pageJSON[i].name);
      page = '<div class="pageDiv col-md-2"><div class="pageTitle">' + pageJSON[i].name + '</div><div class="pageScreenshot"><img style="width:' + ((pageJSON[i].count/maxCount) * 100) + '%;" src="' + screenshotUrl + '"><div class="pageCount">ViewCount: ' + pageJSON[i].count + '</div></div></>';
      $pages.append(page);
    }

    function getScreenshot(name) {
      return "page_thumbnails/" + name + "_small.jpg";
    }

  });
}
