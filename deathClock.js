module.exports = {
	run: function(creep)
	{
		var distanceToSpawn = creep.pos.getRangeTo(18, 16);
		var ticksToLive = distanceToSpawn * 2;
		return ticksToLive;
	}
}
