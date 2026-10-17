import { getCollection } from 'astro:content';
export const halls = ['遮挡', '时机', '尺度', '看不见的东西'];
export const outcomeNames = { solved: '已解决', bypassed: '已绕开', unsolved: '未解决' };
export const href = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path}`;
export async function exhibits() {
 const entries = (await getCollection('exhibits')).filter(e => e.data.locale === 'zh').sort((a,b) => a.data.id.localeCompare(b.data.id));
 if (new Set(entries.map(e => e.data.id)).size !== entries.length) throw new Error('展品编号不能重复');
 return entries;
}
export function allHalls(entries: Awaited<ReturnType<typeof exhibits>>) { return [...new Set([...halls, ...entries.map(e=>e.data.hall)])]; }
