import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

const templatePath = join(process.cwd(), '.github', 'pull_request_template.md');

describe('PR template for catalog submissions', () => {
  it('exists in .github directory', () => {
    expect(existsSync(templatePath)).toBe(true);
  });

  it('documents required catalog fields', () => {
    const content = readFileSync(templatePath, 'utf-8');

    expect(content).toContain('"id":');
    expect(content).toContain('"slug":');
    expect(content).toContain('"kind":');
    expect(content).toContain('"category":');
    expect(content).toContain('"links":');
    expect(content).toContain('"metrics":');
    expect(content).toContain('"locales":');
    expect(content).toContain('"stance":');
    expect(content).toContain('"evidence":');
    expect(content).toContain('"updatedAt":');
    expect(content).toContain('提交方式');
  });
});
