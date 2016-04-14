/*
Add Remove

A component to add and remove inputs on a page. You have the option of sending in custom attributes for:
- `data-can-delete="true"` to add delete buttons (without this attribute, no delete buttons will be rendered)
- `data-delete-btn-text` to send in custom delete button text, this defaults to **Delete** and will only work when the
  `data-can-delete="true"` is set
- `data-add-btn-text` to send in custom add button text, this defaults to **Add**
- `data-max` Maximum items allowed in the list

Markup:
<div data-add-remove
     data-max="5"
     data-can-delete="true"
     data-delete-btn-text="Delete Me"
     data-add-btn-text="Add Me"
     data-template-item="data-template">
  <ul class="add-remove__list" data-add-remove-list>
    <li class="add-remove__item" data-add-remove-item data-template>
      <input name="example[]"
             type="text"
             class="form-input input--medium"
             data-add-remove-input />
    </li>
    <li class="add-remove__item" data-add-remove-item>
      <input name="example[]"
             type="text"
             class="form-input input--medium"
             data-add-remove-input />
    </li>
  </ul>
</div>
 */

var $addRemoveContainers, 
    DEFAULT_ADD_BTN_TEXT = 'Add',
    DEFAULT_DELETE_BTN_TEXT = 'Delete',
    addRemoveContainer = '[data-add-remove]',
    addRemoveList = '[data-add-remove-list]',
    addRemoveItem = '[data-add-remove-item]',
    addRemoveInput = '[data-add-remove-input]',
    template = '[data-template]',
    addButton = '[data-add-btn]',
    maxItems = 'data-max',
    cachedTemplate = [];

var init = function () {
  $addRemoveContainers = $(addRemoveContainer);

  if ($addRemoveContainers.length) {

    $addRemoveContainers.each(function (i, container) {
      var $container = $(container),
          $cloneableItem = $container.find('[' + $container.attr('data-template-item') + ']');

      if($cloneableItem.length > 0) {
      
        // cache this AddRemove instance's item template for when Add is clicked
        cachedTemplate.push($cloneableItem[0].outerHTML);
      
      }

      if (deleteIsEnabled($container)) {
        $container.find(addRemoveItem).each(function (index, listItem) {
          // must always be at least one input on the page for cloning new ones
          if (index > 0) {
            addDeleteBtn($(listItem), $container);
          }
        });
      }

      // only insert Add button if list has space
      if (!maxLengthReached($container)) {
        insertAddButton($container);
      }
    });

  }

};

/**
 * Insert a Add button after the list of items
 * @param $container
 */
var insertAddButton = function ($container) {
  var addBtnText = $container.attr('data-add-btn-text') || DEFAULT_ADD_BTN_TEXT;
  var $addInputBtn = $('<a href="#" data-add-btn>' + addBtnText + '</a>')
    .click(function (event) {
      event.preventDefault();
      addListItem($container);
    });

  $container.append($addInputBtn);
};

/**
 * Show the add input button
 * @param $container
 */
var showAddButton = function ($container) {
  if (!maxLengthReached($container)) {
    $container.find(addButton).show();
  }
};

/**
 * Hide the add input button
 * @param $container
 */
var hideAddButton = function ($container) {
  if (maxLengthReached($container)) {
    $container.find(addButton).hide();
  }
};

/**
 * Add a new list item to list
 * @param $container
 */
var addListItem = function ($container) {
  var $list = $container.find(addRemoveList),
      $lisItem = createItem($container);

  $list.append($lisItem);
  hideAddButton($container);
};


/**
 * Create new list item containing input. If the attribute data-can-delete="true" has been added to the container
 * then the list item will have the delete functionality added.
 * @param $container
 * @returns {*}
 */
var createItem = function ($container) {
  var cachedTemplateIndex,
      $listItemClone,
      $input;

  cachedTemplateIndex = $addRemoveContainers.index($container);

  $listItemClone = $(cachedTemplate[cachedTemplateIndex]);

  $input = $listItemClone.find(addRemoveInput);

  $input.val('');

  if (deleteIsEnabled($container)) {
    addDeleteBtn($listItemClone, $container);
  }

  return $listItemClone;
};

var deleteIsEnabled = function ($container) {
  return $container.attr('data-can-delete') === 'true';
};

var addDeleteBtn = function ($listItem, $container) {
  var deleteBtnText = $container.attr('data-delete-btn-text') || DEFAULT_DELETE_BTN_TEXT,
      $deleteBtn;

  $deleteBtn = $('<a href="#" class="add-remove__remove-btn" data-remove-btn>' + deleteBtnText + '</a>')
    .click(function (event) {
      event.preventDefault();
      $listItem.remove();
      showAddButton($container);
    });

  $listItem.append($deleteBtn);
};

/**
 * Returns whether or not list is full based on data-max attribute
 * @param $container
 * @returns {boolean}
 */
var maxLengthReached = function ($container) {
  var listLength = $container.find(addRemoveItem).length;
  var maxListsAllowed = parseInt($container.attr(maxItems), 10);

  return listLength === maxListsAllowed;
};

module.exports = init;
