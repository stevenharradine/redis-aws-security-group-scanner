security_groups = require ("./securityGroups")
instances = require ("./instances")

security_groups_with_issues = []

security_groups.SecurityGroups.forEach (function (ipPermission) {
	ipPermission.IpPermissions.forEach (function (securityGroup) {
		if (securityGroup.FromPort == 6379) {
			securityGroup.IpRanges.forEach (function (ipRange) {
                if (ipRange.CidrIp.indexOf ("0.0.0.0") == 0) {
                	console.log ("Issue with " + ipPermission.GroupId)
                	security_groups_with_issues.push (ipPermission.GroupId)
                }
			})
		}
	})
})

console.log ()

instances.Reservations.forEach (function (reservation) {
	reservation.Instances.forEach (function (instance) {
		instance.SecurityGroups.forEach (function (securityGroup) {
			if (security_groups_with_issues.indexOf (securityGroup.GroupId) >= 0) {
				console.log ("ATTENTION: " + instance.InstanceId)
			}
		})
	})
})
