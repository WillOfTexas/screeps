var actionFile = require('actions');

module.exports = {
	CL_Setup: function(myRoom, mySpawn)
	{
		var myCL = myRoom.controller.level;
		//var GCL = Game.gcl;
		var map = Game.map;
		var memCL = myRoom.cl;
		var spawnLoc = Game.spawns[mySpawn].pos;
		var extList = myRoom.find(FIND_STRUCTURES,
		{
			filter: (s) =>
				(s.structureType == STRUCTURE_EXTENSION)
		});

		var extList2 = myRoom.find(FIND_CONSTRUCTION_SITES,
		{
			filter: (s) =>
				(s.structureType == STRUCTURE_EXTENSION)
		});

		var extList3 = extList.concat(extList2);
		switch (myCL)
		{
			case 2:
				if ((extList3.length < 5) && (memCL < myCL))
				{
					Game.rooms[myRoom.name].createConstructionSite(spawnLoc.x, spawnLoc.y - 2, STRUCTURE_EXTENSION);
					Game.rooms[myRoom.name].createConstructionSite(spawnLoc.x + 2, spawnLoc.y, STRUCTURE_EXTENSION);
					Game.rooms[myRoom.name].createConstructionSite(spawnLoc.x - 2, spawnLoc.y, STRUCTURE_EXTENSION);
					Game.rooms[myRoom.name].createConstructionSite(spawnLoc.x - 1, spawnLoc.y + 2, STRUCTURE_EXTENSION);
					Game.rooms[myRoom.name].createConstructionSite(spawnLoc.x + 1, spawnLoc.y + 2, STRUCTURE_EXTENSION);
					memCL = myCL;
					console.log("leveled up to 2");
				}
				break;
			case 3:
				if ((extList3.length < 10) && (memCL < myCL))
				{
					Game.rooms[myRoom.name].createConstructionSite(spawnLoc.x, spawnLoc.y - 3, STRUCTURE_EXTENSION);
					Game.rooms[myRoom.name].createConstructionSite(spawnLoc.x + 3, spawnLoc.y, STRUCTURE_EXTENSION);
					Game.rooms[myRoom.name].createConstructionSite(spawnLoc.x - 3, spawnLoc.y, STRUCTURE_EXTENSION);
					Game.rooms[myRoom.name].createConstructionSite(spawnLoc.x - 2, spawnLoc.y + 3, STRUCTURE_EXTENSION);
					Game.rooms[myRoom.name].createConstructionSite(spawnLoc.x + 2, spawnLoc.y + 3, STRUCTURE_EXTENSION);
					memCL = myCL;
					console.log("leveled up to 3");
				}
				break;
			case 4:
				if ((extList3.length < 20) && (memCL < myCL))
				{
					Game.rooms[myRoom.name].createConstructionSite(spawnLoc.x, spawnLoc.y - 4, STRUCTURE_EXTENSION);
					Game.rooms[myRoom.name].createConstructionSite(spawnLoc.x + 4, spawnLoc.y, STRUCTURE_EXTENSION);
					Game.rooms[myRoom.name].createConstructionSite(spawnLoc.x - 4, spawnLoc.y, STRUCTURE_EXTENSION);
					Game.rooms[myRoom.name].createConstructionSite(spawnLoc.x - 3, spawnLoc.y + 4, STRUCTURE_EXTENSION);
					Game.rooms[myRoom.name].createConstructionSite(spawnLoc.x + 3, spawnLoc.y + 4, STRUCTURE_EXTENSION);
					Game.rooms[myRoom.name].createConstructionSite(spawnLoc.x, spawnLoc.y - 5, STRUCTURE_EXTENSION);
					Game.rooms[myRoom.name].createConstructionSite(spawnLoc.x + 5, spawnLoc.y, STRUCTURE_EXTENSION);
					Game.rooms[myRoom.name].createConstructionSite(spawnLoc.x - 5, spawnLoc.y, STRUCTURE_EXTENSION);
					Game.rooms[myRoom.name].createConstructionSite(spawnLoc.x - 4, spawnLoc.y + 5, STRUCTURE_EXTENSION);
					Game.rooms[myRoom.name].createConstructionSite(spawnLoc.x + 4, spawnLoc.y + 5, STRUCTURE_EXTENSION);
					memCL = myCL;
					console.log("leveled up to 4");
				}
				break;
			case 5:
				if ((extList3.length < 30) && (memCL < myCL))
				{
					Game.rooms[myRoom.name].createConstructionSite(spawnLoc.x + 2, spawnLoc.y - 2, STRUCTURE_EXTENSION);
					Game.rooms[myRoom.name].createConstructionSite(spawnLoc.x + 2, spawnLoc.y - 3, STRUCTURE_EXTENSION);
					Game.rooms[myRoom.name].createConstructionSite(spawnLoc.x + 3, spawnLoc.y - 2, STRUCTURE_EXTENSION);
					Game.rooms[myRoom.name].createConstructionSite(spawnLoc.x - 2, spawnLoc.y - 2, STRUCTURE_EXTENSION);
					Game.rooms[myRoom.name].createConstructionSite(spawnLoc.x - 2, spawnLoc.y - 3, STRUCTURE_EXTENSION);
					Game.rooms[myRoom.name].createConstructionSite(spawnLoc.x - 3, spawnLoc.y - 2, STRUCTURE_EXTENSION);
					Game.rooms[myRoom.name].createConstructionSite(spawnLoc.x, spawnLoc.y + 4, STRUCTURE_EXTENSION);
					Game.rooms[myRoom.name].createConstructionSite(spawnLoc.x, spawnLoc.y + 5, STRUCTURE_EXTENSION);
					Game.rooms[myRoom.name].createConstructionSite(spawnLoc.x - 1, spawnLoc.y + 5, STRUCTURE_EXTENSION);
					Game.rooms[myRoom.name].createConstructionSite(spawnLoc.x + 1, spawnLoc.y + 5, STRUCTURE_EXTENSION);
					memCL = myCL;
					console.log("leveled up to 5");
				}
				break;
			case 6:
				//stuff
				break;
			case 7:
				//stuff
				break;
			case 8:
				//stuff
				break;
		}
	},

	placeExtensions: function()
	{
		//
	}

}
