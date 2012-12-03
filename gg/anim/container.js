"use strict";


GG.ANIM.Container = function() {
	this.children = {};
};
GG.ANIM.Container.prototype = {
	getChildren: function() {
		return this.children;
	},
	getChild: function(name) {
		if (name in this.children) {
			return this.children[name];
		}
		throw new Error('There is no child element ' + name + ' in container');
	},
	add: function(child) {
		this._add(child);
	},
	remove: function(child) {
		this._remove(child);
	},
	_add: function(child) {
		this.children[child.name] = child;
		child.parent = this;
	},
	_remove: function(child) {
		if (child.name in this.children) {
			delete this.children[child.name];
		}
		child = void 0;
	}
};