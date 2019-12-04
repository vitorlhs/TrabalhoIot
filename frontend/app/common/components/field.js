(function(){
  angular.module('estoqueApp').component('field', {
    bindings:{
      id: '@',
      label: '@',
      grid: '@',
      placeholder: '@',
      type: '@',
      model: '=',
      readonly: '<'
    },
    controller: [
      'gridSystem',
      function(gridSystem){
        this.$onInit = function(){
          this.gridClasses = gridSystem.toCssClasses(this.grid)
        }
      }
    ],
    template: `
    <div class="{{ $ctrl.gridClasses }}">
      <div class="form-group">
        <label for="{{ $ctrl.id }}">{{ $ctrl.label }}</label>
        <input class="form-control" id="{{ $ctrl.id }}" placeholder="{{ $ctrl.placeholder }}" type="{{ $ctrl.type }}"
          ng-model="$ctrl.model" ng-readonly="ctrl.readonly" />
      </div>
    </div>
    `
  })
})()
