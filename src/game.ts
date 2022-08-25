

//TODO: convert ethers to web3
// Import `connect` from Tableland plus wallet requirements from `ethers`
import { Wallet, providers } from "ethers";
import { connect, CreateOptions } from "@tableland/sdk";
import fetch, { Headers, Request, Response } from "node-fetch";

if (!globalThis.fetch) {
  (globalThis).fetch = fetch;
}


// Since Metamask is not accessible via browser injection,
// it is required to supply a private key.
// Do not expose this key directly but load from a `.env` file
const privateKey = "5ae610def293d2106904460d47909e7b4067269065003407993b7825e55fa2d6";
const wallet = new Wallet(privateKey);

// An RPC provider must be provided to establish a connection to the chain
const provider = new providers.AlchemyProvider("goerli", "338mlROLYprSGZhk_tS1rWiHyDSVaX36");
// By default, `connect` uses the Tableland testnet validator;
// it will sign a message using the associated wallet

// Create a new table with a supplied SQL schema and optional `prefix`
// @return {Connection} Connection object, including the table's `name`


async function executeTask() {
  
  const signer = wallet.connect(provider);
  const tableland = await connect({ network: "testnet", signer,chain: "ethereum-goerli"});

  const tableName:CreateOptions = {}
  tableName.prefix = `mytable`
        const { name } = await tableland.create(
          `name text, id int, primary key (id)`, // Table schema definition
          tableName // Optional prefix; used to define a human-readable string
        );
        log(name);
// }
// executeTask()

//	The table's `name` is in the format `{prefix}_{chainId}_{tableId}`
 // e.g., mytable_4_1
// Without the supplied `prefix`, `name` would be be `_4_1`

// async function executeTask2() {
// Insert a row into the table
const writeRes = await tableland.write(`INSERT INTO ${name} (id, name) VALUES (0, 'Bobby Tables');`);
// }
// executeTask2()

// async function executeTask3() {
    // Perform a read query, requesting all rows from the table
    const readRes = await tableland.read(`SELECT * FROM ${name};`);
    // Note: a table *must first exist* in Tableland before performing `read`
    // See the `read` documentation below for more details
    log(readRes)
}

executeTask()



/// --- Set up a system ---

class RotatorSystem {
  // this group will contain every entity that has a Transform component
  group = engine.getComponentGroup(Transform)

  update(dt: number) {
    // iterate over the entities of the group
    for (const entity of this.group.entities) {
      // get the Transform component of the entity
      const transform = entity.getComponent(Transform)

      // mutate the rotation
      transform.rotate(Vector3.Up(), dt * 10)
    }
  }
}

// Add a new instance of the system to the engine
engine.addSystem(new RotatorSystem())

/// --- Spawner function ---

function spawnCube(x: number, y: number, z: number) {
  // create the entity
  const cube = new Entity()

  // add a transform to the entity
  cube.addComponent(new Transform({ position: new Vector3(x, y, z) }))

  // add a shape to the entity
  cube.addComponent(new BoxShape())

  // add the entity to the engine
  engine.addEntity(cube)

  return cube
}

/// --- Spawn a cube ---

const cube = spawnCube(8, 1, 8)

cube.addComponent(
  new OnPointerDown(() => {
    cube.getComponent(Transform).scale.z *= 1.1
    cube.getComponent(Transform).scale.x *= 0.9

    spawnCube(Math.random() * 8 + 1, Math.random() * 8, Math.random() * 8 + 1)
  })
)
