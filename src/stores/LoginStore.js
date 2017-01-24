import dispatcher from '../dispatcher/dispatcher.js';
import Actions from '../actions/Actions.js';
import BaseStore from './BaseStore.js';
import { browserHistory } from 'react-router';

class LoginStore extends BaseStore {
    constructor() {
        super();
    }

    onAction(action, payload) {
        switch (action) {
            case Actions.loginUser:
                this.loginAndRedirect(payload);
            default:
                return true;
        }
    }

    loginAndRedirect(login) {
        $.ajax({
            type: 'POST',
            url: '/login',
            data: { userName: login.userName, password: login.password }
        })
            .done((data) => {
                browserHistory.push('/calendar');
            })
            .fail(function (jqXHR) {
                if (jqXHR.status === 409) {
                    $("#showResponseArea").removeClass("hide");
                    $("#showResponseArea").addClass("alert-danger");
                } else {
                    console.log("Uncaught Error");
                }
            });
    }
}

export default new LoginStore;
