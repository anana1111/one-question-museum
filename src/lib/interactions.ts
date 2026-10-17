// 交互登记表：展品数据里的 interaction 字段 → 对应的交互组件。
// 新增一件带交互的展品时，只需要：
//   1. 在 src/components/ 新建组件（例如 MyExperiment.astro）
//   2. 在下面 import 它，并在 interactions 里登记一行
// 不需要修改展品页面模板。
import Occlusion from '../components/Occlusion.astro';

export const interactions = {
  occlusion: Occlusion,
} as const;

export type InteractionName = keyof typeof interactions;

export function getInteraction(name: string) {
  if (name === 'none') return null;
  const component = (interactions as Record<string, unknown>)[name];
  if (!component) {
    throw new Error(`交互 "${name}" 还没有登记。请在 src/lib/interactions.ts 里添加。`);
  }
  return component as (typeof interactions)[InteractionName];
}
