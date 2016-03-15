import dispatcher from '../dispatcher';
import {InfoConstants} from '../constants';
import $ from 'jquery';


const urlPattern = /^(.*?:)\/\/([^\/]*)/;


export default {
  get(requestUrl, uuid) {
    var match = urlPattern.exec(requestUrl);

    if (!match) {
      throw new Error("Could not find protocol and hostname in URL: " + requestUrl);
    }

    var url = `${match[1]}//${match[2]}/__flaskwork/${uuid}`;

    return $.ajax({
      url: url,
      type: 'GET'
    }).success(data => {
      dispatcher.dispatch({
        type: InfoConstants.ADD,
        info: data,
        uuid: uuid
      });
    });
  },

  select(uuid) {
    dispatcher.dispatch({
      type: InfoConstants.SELECT,
      uuid: uuid
    });
  },

  reset() {
    dispatcher.dispatch({
      type: InfoConstants.RESET
    });
  }
};