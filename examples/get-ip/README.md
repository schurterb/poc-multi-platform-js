# get-ip
####(Proof-of-concept Multi-plaform JavaScript example)

### Overview

This example demonstrates the use of a single simple module in multiple contexts.
The module in question ('ip.mjs') can be found in 'src/all/', indicating it is to be deployed
to both the client and server side equally.

### Usage

To see this example in action, first build it with
```
./scripts/build
```

Then run it with
```
./scripts/run
```

This will start a server up on port 3000.  At http://localhost:3000, you should
see a web page with three buttons indicating the three contexts in which the
method defined in the example module can be ran.

When done, the build can be cleaned up with
```
./scripts/clean
```
