var actions = require('actions');

var roleHarvester = {
	run: function(creep)
	{
		if (creep.carry.energy < 50)
		{
			actions.collectEnergy(creep);
		}
		else
		{
			actions.depositEnergy(creep);
		}
	}
};

module.exports = roleHarvester;
