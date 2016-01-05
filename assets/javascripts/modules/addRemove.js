/**
 * Add/Remove Module
 *
 * Usage:
 *
 *  <div class="add-remove"
 *        data-add-remove
 *        data-add-remove-max="5"
 *        data-attr-name="redirectUris[$]">
 *
 *    <script type="text/template" data-item-template>
 *      <li class="add-remove__item" data-add-remove-item>
 *        <input type="text" value="" data-add-remove-unique/>
 *      </li>
 *    </script>
 *    <script type="text/template" data-remove-btn-template>
 *      <a href="#" class="add-remove__remove-btn" data-remove-btn>Delete</a>
 *    </script>
 *    <script type="text/template" data-add-btn-template>
 *      <a href="#" data-add-btn>Add another redirect URI</a>
 *    </script>
 *
 *    <ul data-add-remove-list>
 *      <li data-add-remove-item>
 *        <input type="text" value="Value 1" name="redirectUris[0]" data-add-remove-unique/>
 *      </li>
 *      <li data-add-remove-item>
 *        <input type="text" value="Value 2" name="redirectUris[1]" data-add-remove-unique/>
 *      </li>
 *      <li data-add-remove-item>
 *        <input type="text" value="Value 3" name="redirectUris[2]" data-add-remove-unique/>
 *      </li>
 *    </ul>
 *
 *  </div>
 *
 */


var addRemoveContainer = '[data-add-remove]',
    addRemoveList      = '[data-add-remove-list]',
    addRemoveItem      = '[data-add-remove-item]',
    addButton          = '[data-add-btn]',
    removeButton       = '[data-remove-btn]',
    maxItems           = 'data-add-remove-max';

var itemTemplate       = '[data-item-template]',
    addBtnTemplate     = '[data-add-btn-template]',
    removeBtnTemplate  = '[data-remove-btn-template]';


/**
 * Init add/remove, where necessary
 *
 * @param
 */
module.exports = function() {

  var $addRemoveContainers = $(addRemoveContainer);

  // only continue if counter html exists
  if($addRemoveContainers.length === 0) return;

  // for each add/remove container on the page
  $addRemoveContainers.each(function() {
    var $container = $(this);

    $container.find('[data-removable]').each(function() {
      var $item = $(this);

      // add html for remove button
      insertRemoveButton($container, $item);

      // bind remove click event
      bindRemoveEvent($container, $item);

    });

    // only insert Add button if list has space
    if(!isListFull($container)) {

      // add html for add button
      insertAddButton($container);

    }

    // bind add click
    bindAddEvent($container);

  });

};

/**
 * Insert a Remove button in the item
 *
 * @param $container
 * @param $item
 */
var insertRemoveButton = function($container, $item) {

  var html = $container.find(removeBtnTemplate).html();

  $item.append(html);

};

/**
 * Bind click event on Remove button for an item
 *
 * @param $container
 * @param $item
 */
var bindRemoveEvent = function($container, $item) {

  $item.on('click', removeButton, function(e) {
    e.preventDefault();

    // remove list item
    $item.remove();

    // if there's no Add button
    if($container.find(addButton).length === 0) {

      // insert Add button as there must be at least one available slot
      insertAddButton($container);

    }

  });

};

/**
 * Insert a Add button after the list of items
 *
 * @param $container
 */
var insertAddButton = function($container) {

  var html = $container.find(addBtnTemplate).html();

  $container.append(html);

};

/**
 * Bind a click event to the Add button
 *
 * @param $container
 */
var bindAddEvent = function($container) {

  $container.on('click', addButton, function(e) {

    e.preventDefault();

    addItem($container);

  });

};


/**
 * Add a new item to the list
 *
 * @param $container
 */
var addItem = function($container) {

  var $list    = $container.find(addRemoveList),
      $newItem = createItem($container);

  // only insert Remove button if item should be removable
  if($newItem.is('[data-removable]')) {

    // add the Remove button
    insertRemoveButton($container, $newItem);

    // bind click event on Remove button
    bindRemoveEvent($container, $newItem);

  }

  // append new item to list
  $list.append($newItem);

  // if max length reached
  if(isListFull($container)) {
    $container.find(addButton).remove();
  }

};



/**
 * Create new item based off template
 */
var createItem = function($container) {

  var listCount = $container.find('[data-add-remove-item]').length,      // get count of items
      nameAttr  = $container.attr('data-attr-name'),                     // get pattern for unique name attribute
      $newItem,
      $unique;

  // get clone of template item wrapped in LI
  $newItem = $($container.find(itemTemplate).html());

  // get unique item (e.g. input, textarea) within item
  $unique = $newItem.find('[data-add-remove-unique]');

  // prepare unique attributes for unique element (e.g. input, textarea), if specified
  if(nameAttr) {
    nameAttr = nameAttr.replace(/\$/, listCount);
    $unique.attr({name: nameAttr});
  }

  return $newItem;

};


/**
 * Returns whether or not list is full based on maxItems attribute
 *
 * @param $container
 * @returns {boolean}
 */
var isListFull = function($container) {
  return $container.find(addRemoveItem).length === parseInt($container.attr(maxItems), 10);
};
