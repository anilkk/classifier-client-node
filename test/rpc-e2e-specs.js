import chai from 'chai';
import should from 'should';
import { remote } from 'webdriverio';
import ClassifierClient from '..';

chai.use(should);

const PORT = 50051;
const HOST = "127.0.0.1";

describe('RPC server', function () {
  it('should find elements when given a webdriverio object', async function (done) {
    const c = new ClassifierClient({host: HOST, port: PORT});
    const driver = await remote({
      host: '127.0.0.1',
      port: 4444,
      capabilities: {
        browserName: 'chrome'
      }
    });
    try {
      await driver.url('https://test.ai');
      const els = await c.findElementsMatchingLabel({
        driver,
        labelHint: 'blog',
      });
      await els[0].click();
      (await driver.getUrl()).should.eql('https://www.test.ai/blog/');
    } finally {
      await driver.deleteSession();
      done();
    }
  });
});
