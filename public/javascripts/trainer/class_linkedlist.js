// JavaScript linked list
// Copyright (c) 2007 James Coglan

// It's MIT-licensed, do whatever you want with it.
// http://www.opensource.org/licenses/mit-license.php

function LinkedList() {}
LinkedList.prototype = {
    length: 0,
    first: null,
    last: null,

    each: function(fn) {
        var node = this.first,
            n = this.length;
        for (var i = 0; i < n; i++) {
            fn(node, i);
            node = node.next;
        }
    },

    skip: function(node, n) {
        while (n--) {
            if (node != this.last) {
                node = node.next;
            }
        }
        return node;
    },

    at: function(i) {
        if (!(i >= 0 && i < this.length)) {
            return null;
        }
        var node = this.first;
        while (i--) {
            node = node.next;
        }
        return node;
    },

    withData: function(data) {
        var node = this.first,
            n = this.length;
        while (n--) {
            if (node.data == data) {
                return node;
            }
            node = node.next;
        }
        return null;
    },
    // find an object in the ll with a certain value
    update_rating: function(id, new_rating) {
        var node = this.first,
            n = this.length;
        while (n--) {
            if (node.data.id == id) {
                node.data.rating = new_rating;
            }
            node = node.next;
        }
    },
    /*
      randomNode: function() {
        var n = Math.floor(Math.random() * this.length);
        return this.at(n);
      },
     */

    toArray: function() {
        var arr = [],
            node = this.first,
            n = this.length;
        while (n--) {
            arr.push(node.data);
            node = node.next;
        }
        return arr;
    }
};

LinkedList.Node = function(data) {
    this.prev = null;
    this.next = null;
    this.data = data;
};

LinkedList.Circular = function() {};
LinkedList.Circular.Methods = {
    append: function(node) {
        if (this.first === null) {
            node.prev = node;
            node.next = node;
            this.first = node;
            this.last = node;
        } else {
            node.prev = this.last;
            node.next = this.first;
            this.first.prev = node;
            this.last.next = node;
            this.last = node;
        }
        this.length++;
    },

    prepend: function(node) {
        if (this.first === null) {
            this.append(node);
            return;
        } else {
            node.prev = this.last;
            node.next = this.first;
            this.first.prev = node;
            this.last.next = node;
            this.first = node;
        }
        this.length++;
    },

    insertAfter: function(node, newNode) {
        newNode.prev = node;
        newNode.next = node.next;
        node.next.prev = newNode;
        node.next = newNode;
        if (newNode.prev == this.last) {
            this.last = newNode;
        }
        this.length++;
    },

    insertBefore: function(node, newNode) {
        newNode.prev = node.prev;
        newNode.next = node;
        node.prev.next = newNode;
        node.prev = newNode;
        if (newNode.next == this.first) {
            this.first = newNode;
        }
        this.length++;
    },

    remove: function(node) {
            if (this.length > 1) {
                node.prev.next = node.next;
                node.next.prev = node.prev;
                if (node == this.first) {
                    this.first = node.next;
                }
                if (node == this.last) {
                    this.last = node.prev;
                }
            } else {
                this.first = null;
                this.last = null;
            }
            node.prev = null;
            node.next = null;
            this.length--;
        }
        /*
        removemod: function(node) {
          if (this.length > 1) {
            node.prev.next = node.next;
            node.next.prev = node.prev;
            if (node == this.first) { this.first = node.next; }
            if (node == this.last) { this.last = node.prev; }
          } else {
            this.first = null;
            this.last = null;
          }
          this.length--;
        }
        */

};

LinkedList.Circular.prototype = new LinkedList();
for (var method in LinkedList.Circular.Methods) {
    LinkedList.Circular.prototype[method] = LinkedList.Circular.Methods[method];
}

LinkedList.Circular.fromArray = function(list) {
    var linked = new LinkedList.Circular();
    var n = list.length;
    while (n--) {
        linked.prepend(new LinkedList.Node(list[n]));
    }
    return linked;
};