import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

const issueTemplateDir = join(process.cwd(), '.github', 'ISSUE_TEMPLATE');
const formPath = join(issueTemplateDir, 'submit-claw-entry.yml');
const quickPath = join(issueTemplateDir, 'suggest-project.md');
const configPath = join(issueTemplateDir, 'config.yml');

describe('Issue templates for catalog intake', () => {
  it('includes structured and quick issue templates', () => {
    expect(existsSync(formPath)).toBe(true);
    expect(existsSync(quickPath)).toBe(true);
    expect(existsSync(configPath)).toBe(true);
  });

  it('structured issue form includes schema-aligned fields', () => {
    const content = readFileSync(formPath, 'utf-8');

    expect(content).toContain('kind');
    expect(content).toContain('category');
    expect(content).toContain('links');
    expect(content).toContain('locales');
    expect(content).not.toContain('metrics_stars');
    expect(content).not.toContain('stance_recommendation');
    expect(content).not.toContain('stance_confidence');
    expect(content).not.toContain('id: evidence');
    expect(content).not.toContain('label: updatedAt');
  });
});
