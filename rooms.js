//var sourceFile = ('sources');
var slotFile = ('slots');

module.exports = {
	init: function()
	{
		if (Memory.rooms == undefined)
		{
			Memory.rooms = new Object();
		}
		for (var aRoom in Game.rooms)
		{
			if (!Memory.rooms[aRoom])
			{
				//var sourceSlots = slotFile.countSlots(aRoom);
				var thisRoom = new Object();
				thisRoom.sources = [];
				thisRoom.cl = 1;

				let sources = Game.rooms[aRoom].find(FIND_SOURCES);
				for (var fs in sources)
				{
					var foundSource = sources[fs];
					var source = new Object();
					source.id = foundSource.id;
					source.maxHarvesters = 2; //someday this will be dynamic...
					source.harvesters = 0;
					thisRoom.sources.push(source);
					//Game.rooms[aRoom].memory.sources = sources;
				}
				Memory.rooms[aRoom] = thisRoom;
			}
		}
	}
}
