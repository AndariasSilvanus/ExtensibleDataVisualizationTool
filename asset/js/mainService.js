/**
 * Created by Andarias Silvanus on 16/06/24.
 */

optikosApp.service('stateService', function(){
    var state = 'Data';

    this.setState = function(state_) {
        state = state_;
    } ;

    this.getState = function() {
        return state;
    };
})

.service('WSListService', function(){
    var workSheetList = [];
    return workSheetList;

    //this.pushList = function (ws) {
    //    workSheetList.push(ws);
    //};
    //
    //this.getListLength = function () {
    //    return workSheetList.length;
    //};
    //
    //this.getList = function () {
    //    return workSheetList;
    //};
});