var actionFile = require('actions');

var roleUpgrader = {
	run: function(creep)
	{
		if (creep.carry.energy == 0)
		{
			actionFile.collectEnergy(creep);
		}
		else
		{
			actionFile.upgradeSomething(creep);
		}
	}
};

module.exports = roleUpgrader;
