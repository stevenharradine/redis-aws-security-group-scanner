# redis-aws-security-group-scanner
Scans security groups in aws for redis being exposed to the world

## Requirements
 * aws-cli
 * node

## Usage
### Set your region
```
nano ~/.aws/config
```

### Dump aws data (instances and security groups)
```
aws ec2 describe-instances > instances.json
aws ec2 describe-security-groups > securityGroups.json
```

### Scan for open security groups
```
node findredis.js
```
