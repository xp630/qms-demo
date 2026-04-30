/**
 * FAQ 问答匹配
 * 常见问题直接返回预设答案，不走 Dify API
 */

// 栏目定义
export const CATEGORIES = {
  POLICY: 'policy',         // 惠企政策
  TAX: 'tax',               // 税收优惠
  TALENT: 'talent',         // 人才引进
  TECH: 'tech',             // 科技创新
  FINANCE: 'finance',       // 创业扶持
}

export function useFAQ() {
  // 预设常见问题 Q&A（每个问题带有 category 元数据）
  const faqDatabase = [
    {
      category: CATEGORIES.POLICY,
      keywords: ['高新技术企业', '认定条件', '高新企业认定'],
      question: '高新技术企业认定需要什么条件？',
      answer: '高新技术企业认定需要满足以下条件：\n\n1. **知识产权**：在中国境内通过自主研发、受让、受赠、并购等方式拥有主要产品（服务）的核心技术知识产权的所有权。\n\n2. **技术领域**：属于《国家重点支持的高新技术领域》规定的范围。\n\n3. **人员比例**：科技人员占企业当年职工总数的比例不低于10%。\n\n4. **研发费用**：近三个会计年度研究开发费用总额占同期销售收入总额的比例符合要求。\n\n5. **高新技术收入**：近一年高新技术产品（服务）收入占企业同期总收入的比例不低于60%。\n\n6. **企业成长性**：企业成长性指标综合得分达到相应要求。'
    },
    {
      category: CATEGORIES.TAX,
      keywords: ['研发费用', '加计扣除', '研发费用加计扣除'],
      question: '研发费用加计扣除有什么政策？',
      answer: '研发费用加计扣除政策主要内容：\n\n1. **扣除比例**：企业开展研发活动中实际发生的研发费用，未形成无形资产计入当期损益的，在按规定据实扣除的基础上，再按照实际发生额的100%在税前加计扣除。\n\n2. **适用范围**：除烟草制造业、住宿和餐饮业、批发和零售业、房地产业、租赁和商务服务业、娱乐业以外，其他行业均可享受。\n\n3. **申报要求**：需在年度汇算清缴时填报《研发费用加计扣除优惠明细表》。\n\n4. **凭证要求**：研发项目需经科技部门登记立项，设置研发费用辅助账。'
    },
    {
      category: CATEGORIES.TALENT,
      keywords: ['人才引进', '人才政策', '落户'],
      question: '人才引进有哪些政策？',
      answer: '人才引进政策主要内容：\n\n1. **引进对象**：\n   - 高层次人才（国家级、省级人才计划入选者）\n   - 专业技术人才（具有高级职称或博士学历）\n   - 技能人才（高级技师、技师）\n   - 高校毕业生\n\n2. **支持政策**：\n   - 科研启动经费支持\n   - 住房补贴或人才公寓\n   - 子女入学优先安排\n   - 医疗保障绿色通道\n\n3. **申报流程**：\n   - 登录人才服务综合平台\n   - 填写人才信息并上传证明材料\n   - 等待资格审查和公示'
    },
    {
      category: CATEGORIES.TECH,
      keywords: ['科技型中小企业', '评价', '科技型中小企业评价'],
      question: '科技型中小企业如何评价？',
      answer: '科技型中小企业评价条件：\n\n1. **基本条件**：\n   - 在中国境内注册的居民企业\n   - 职工总数不超过500人、年销售收入不超过2亿元、资产总额不超过2亿元\n   - 提供的产品和服务不属于国家规定的禁止、限制和淘汰类\n\n2. **科技指标**（满足其一）：\n   - 科技人员占职工总数比例≥20%\n   - 研发费用占销售收入总额比例≥4%\n   - 拥有有效期内的知识产权（发明专利、植物新品种等≥1项）\n\n3. **评价流程**：\n   - 登录"科技型中小企业评价系统"填报\n   - 省级科技管理部门公示入库\n   - 获得入库编号后享受优惠政策'
    },
    {
      category: CATEGORIES.FINANCE,
      keywords: ['创业担保贷款', '贷款贴息', '创业扶持'],
      question: '创业扶持贷款怎么申请？',
      answer: '创业扶持贷款申请指南：\n\n1. **贷款对象**：\n   - 高校毕业生\n   - 登记失业人员\n   - 退役军人\n   - 返乡创业农民工\n\n2. **贷款额度**：\n   - 个人创业：最高30万元\n   - 小微企业：最高300万元\n\n3. **贴息标准**：\n   - 部分贴息或全额贴息\n   - 贴息期限最长3年\n\n4. **申请流程**：\n   - 到当地人社部门申请资格认定\n   - 携带认定证明到指定银行申请贷款\n   - 银行审核通过后发放贷款'
    }
  ]

  /**
   * 匹配问题（可指定栏目过滤）
   * @param {string} query - 用户问题
   * @param {string} category - 栏目分类（可选，不传则匹配所有栏目）
   * @returns {{ matched: boolean, answer: string, question: string, category: string }} 匹配结果
   */
  function matchFAQ(query, category = null) {
    if (!query || typeof query !== 'string') {
      return { matched: false, answer: '', question: '', category: '' }
    }

    const lowerQuery = query.toLowerCase()

    // 过滤：只匹配指定栏目的 FAQ（如果指定了栏目）
    const filteredFAQ = category
      ? faqDatabase.filter(item => item.category === category)
      : faqDatabase

    for (const item of filteredFAQ) {
      // 关键词匹配
      const isMatched = item.keywords.some(keyword =>
        lowerQuery.includes(keyword.toLowerCase())
      )

      if (isMatched) {
        return {
          matched: true,
          answer: item.answer,
          question: item.question,
          category: item.category
        }
      }
    }

    return { matched: false, answer: '', question: '', category: '' }
  }

  /**
   * 获取指定栏目的所有 FAQ 问题（用于快捷问题展示）
   * @param {string} category - 栏目分类
   */
  function getFAQQuestionsByCategory(category) {
    return faqDatabase
      .filter(item => item.category === category)
      .map(item => item.question)
  }

  /**
   * 获取所有栏目定义
   */
  function getCategories() {
    return Object.values(CATEGORIES)
  }

  return {
    CATEGORIES,
    matchFAQ,
    getFAQQuestionsByCategory,
    getCategories,
    faqDatabase
  }
}
