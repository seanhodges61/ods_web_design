operations = [
	{
		name: "set"
	},
	{
		name: "remove",
		checkValid: function(){
			return build.rowSize() > 1;
		}
	},
	{
		name: "add",
		checkValid: function(){
			return build && build.rowSize() < 7;
		}
	}
];
modes = [
	{
		name: "searchPath"
	}
];

var leadingNode;
var newNode;
var trailingNode;

function isSO() { return op.get() === "set"; }
function isAO() { return op.get() === "add"; }
function isRO() { return op.get() === "remove"; }
