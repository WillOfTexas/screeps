var actionFile = require('actions');

var roleRepairer = {
	run: function(creep)
	{
		if (creep.carry.energy == 0)
		{
			actionFile.collectEnergy(creep);
		}
		else
		{
			actionFile.repairSomething(creep);
		}
	}
};

module.exports = roleRepairer;
