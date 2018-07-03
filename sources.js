module.exports = {
	incrementHervesters: function(myRoom, creep)
	{
		let sources = Memory.rooms[myRoom.name].sources;
		if (creep.memory.role == 'harvester' && !(creep.memory.source))
		{
			for (var foundSource in sources)
			{
				let source = sources[foundSource];
				if (source.harvesters < source.maxHarvesters)
				{
					source.harvesters++;
					creep.memory.source = source.id;
					break;
				}
			}
		}
	},

	decrementHarvesters: function(myRoom, creep)
	{
		let sources = Memory.rooms[myRoom.name].sources;
		if (creep.memory.role == 'harvester')
		{
			for (var foundSource in sources)
			{
				var source = sources[foundSource];
				if (source.id == creep.memory.source)
				{
					source.harvesters--;
					break;
				}
			}
		}
	},

	countHarvesters: function(myRoom)
	{
		let sources = Memory.rooms[myRoom.name].sources;
		let sourceCount;
		for (var foundSource in sources)
		{
			sourceCount = 0;
			let source = sources[foundSource];
			for (var name in Game.creeps)
			{
				var creep = Game.creeps[name];
				if (creep.memory.role == 'harvester')
				{
					if (creep.memory.source == source.id)
					{
						sourceCount++;
					}
				}
			}
			while (sourceCount < source.harvesters)
			{
				console.log("fixing");
				console.log(source.id);
				console.log(source.harvesters);
				source.harvesters--;
				console.log(source.harvesters);
			}
		}
	},
}
