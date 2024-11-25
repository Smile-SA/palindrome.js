import { remoteSchema } from "../data-examples/remote_data.js";
import { fetchFromDataProviders } from "../src/utils/fetchUtils.js";
import { writeFile } from 'fs/promises';

const data = remoteSchema();

const main = async () => {
    const dataStructure = await fetchFromDataProviders(data);
    try {
        await writeFile('remoteData.json', JSON.stringify(dataStructure, null, 2));
        console.log('JSON file has been written successfully');
      } catch (err) {
        console.error('Error writing JSON file:', err);
      }
}
main();