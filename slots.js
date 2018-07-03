module.exports = {
	countSlots: function(source)
	{
		// var sources = Memory.rooms[myRoom.name].sources;
		// var totals = [];
		// for (var source in sources)
		// {
		var x = Game.getObjectById(Memory.rooms[myRoom.name].sources[source].id).pos.x;
		var y = Game.getObjectById(Memory.rooms[myRoom.name].sources[source].id).pos.y;
		var total = 0;

		var checkThese = [
		{
			x: x,
			y: y - 1
		},
		{
			x: x - 1,
			y: y - 1
		},
		{
			x: x - 1,
			y: y
		},
		{
			x: x - 1,
			y: y + 1
		},
		{
			x: x,
			y: y + 1
		},
		{
			x: x + 1,
			y: y + 1
		},
		{
			x: x + 1,
			y: y
		},
		{
			x: x + 1,
			y: y - 1
		}];

		for (let spot in checkThese)
		{
			var terrain = this.checkTerrain(myRoom, checkThese[spot].x, checkThese[spot].y);

			if (terrain != 'wall')
			{
				total += 1;
			}
		}
		return total;
		//totals.push(total);
		//}
		//return totals;
	},

	checkTerrain: function(myRoom, x, y)
	{
		return myRoom.lookForAt('terrain', x, y);
	}
}
