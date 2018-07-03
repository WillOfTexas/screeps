var actionFile = require('actions');

var roleBuilder = {
	run: function(creep)
	{
		if (creep.carry.energy == 0)
		{
			actionFile.collectEnergy(creep);
		}
		else
		{
			//var harvs = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length;
			actionFile.buildSomething(creep);
		}
	}
};

module.exports = roleBuilder;
