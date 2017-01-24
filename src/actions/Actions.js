import dispatcher from '../dispatcher/dispatcher.js';

var Actions = {
    loginUser: function (user) {
        dispatcher.dispatch(Actions.loginUser, user);
    },
    saveAbsence: function (absence) {
        dispatcher.dispatch(Actions.saveAbsence, absence)
    },
    updateAbsence: function () {
        dispatcher.dispatch(Actions.updateAbsence, null)
    }
}

export default Actions;
