// ======================================================
// 反馈通道（统一出口）
// ------------------------------------------------------
// 主页是纯静态站点（GitHub Pages），没有自己的服务器，
// 所以表单提交交给第三方转发服务 FormSubmit：
//   浏览器 → FormSubmit → 我的邮箱
// 不需要注册，首次提交后点激活邮件即可长期生效。
//
// 可用环境变量 VITE_FORM_ENDPOINT 覆盖，便于更换后端。
// ======================================================

export const FORM_ENDPOINT =
  import.meta.env.VITE_FORM_ENDPOINT || 'https://formsubmit.co/ajax/carrotsoup@qq.com'

/**
 * 发送一条表单数据到 FormSubmit。
 * @returns {Promise<{ok: boolean, message?: string}>}
 */
export async function sendToFormSubmit(payload) {
  const res = await fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      // FormSubmit 约定字段
      _subject: '来自个人主页的留言',
      _captcha: 'false',
      _template: 'table',
      ...payload,
    }),
  })

  // FormSubmit 返回 { success: "true" | true, message: "..." }
  const data = await res.json().catch(() => ({}))
  const ok = res.ok && (data.success === true || data.success === 'true')
  return { ok, message: data?.message }
}
