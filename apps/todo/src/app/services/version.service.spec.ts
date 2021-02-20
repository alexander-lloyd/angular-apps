import {VersionService} from './version.service';

describe('VersionService', () => {
  let service: VersionService;

  beforeEach(() => {
    service = new VersionService();
  });

  it('should get the app build time', async () => {
    expect.assertions(1);
    const buildTime = await service.getBuildTime().toPromise();
    expect(buildTime).toBe('Sat, 20 Feb 2021 14:58:25 GMT');
  });

  it('should get the commit hash', async () => {
    expect.assertions(1);
    const commitHash = await service.getCommitHash().toPromise();
    expect(commitHash).toBe('f4742bb');
  });

  it('should get the app version', async () => {
    expect.assertions(1);
    const version = await service.getVersion().toPromise();
    expect(version).toBe('1.0.0');
  });
});
