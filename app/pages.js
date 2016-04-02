import errorHandler from './errorhandler'
export default function (node_Id) {
  $.getJSON('/tests/pages.json',json => {
    if(errorHandler(node_Id, json)){
      return;
    }
  });
}
