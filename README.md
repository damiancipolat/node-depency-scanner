# Node.js dependecy scanner
A simple tool to manage a private npm registry, to be used into development teams,t his tool uses nodejs consuming GITLAB api.

# Use case:
Suppose that we have to work with a dependency repository, in this case we propose dependency between gitlab repository within the same organization group. So we have a team that develops node packages and services that use it. But what is the problem, the number of services and packages that is difficult to control are growing more and more. This tool is an automatic solution to this.

## Example:
The command output will draw a tree with the dependency relation.

```sh
> Scanning packages repositories...
> Downloading projects and parsing...
> Found #5 packages, #7 projects...

< Dependencies map >

├─ @damian/client-schema
│  ├─ onboarding-service
│  └─ clients-service
├─ @damian/cuil
│  └─ onboarding-service
├─ @damian/dynamo-lib
│  └─ onboarding-service
├─ @damian/op-connector
│  └─ onboarding-service
└─ @damian/sqs-lib
   └─ Not found
```

## Configuration:
Go to /config/default.json and change the configuration file.

```json
{
	"access":{
		"host":  "https://gitlab.com/api/v4",
		"token": "xxxxxxx" 
  },
  "packages":"common",
  "destination":[
    "bff-service",
    "home-service"
  ],
  "compareBranch":"develop",
  "origin":{
		"source":"group",
		"name":"damian"
  }
}
```
