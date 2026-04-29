// TRACE 模块 Mock 数据 - 机台溯源管理

// 生产信息数据
export const productionInfoList = [
  { id: 1, machineNo: 'M20240001', productName: '类型A', output: 1200, qualified: 1180, fpy: 98.3, productionDate: '2024-04-01', shift: '白班', operator: '操作员A' },
  { id: 2, machineNo: 'M20240002', productName: '类型B', output: 980, qualified: 960, fpy: 98.0, productionDate: '2024-04-01', shift: '白班', operator: '操作员B' },
  { id: 3, machineNo: 'M20240003', productName: '类型A', output: 1100, qualified: 1090, fpy: 99.1, productionDate: '2024-04-01', shift: '夜班', operator: '操作员C' }
]

// 电池管理数据
export const batteryList = [
  { id: 1, batteryNo: 'BAT20240001', machineNo: 'M20240001', voltage: 48, capacity: 100, status: '正常使用', productionDate: '2024-03-15', warranty: '24个月' },
  { id: 2, batteryNo: 'BAT20240002', machineNo: 'M20240002', voltage: 48, capacity: 95, status: '正常使用', productionDate: '2024-03-16', warranty: '24个月' },
  { id: 3, batteryNo: 'BAT20240003', machineNo: 'M20240003', voltage: 48, capacity: 98, status: '正常使用', productionDate: '2024-03-17', warranty: '24个月' }
]

// 销售信息数据
export const saleInfoList = [
  { id: 1, saleNo: 'SO2024-001', machineNo: 'M20240001', customerName: '顾客A', saleDate: '2024-03-20', quantity: 10, amount: 500000, warranty: '12个月' },
  { id: 2, saleNo: 'SO2024-002', machineNo: 'M20240002', customerName: '顾客B', saleDate: '2024-03-22', quantity: 5, amount: 250000, warranty: '12个月' },
  { id: 3, saleNo: 'SO2024-003', machineNo: 'M20240003', customerName: '顾客C', saleDate: '2024-03-25', quantity: 8, amount: 400000, warranty: '12个月' }
]

// 机台履历数据
export const machineHistoryList = [
  { id: 1, machineNo: 'M20240001', eventType: '生产', eventDate: '2024-04-01', productName: '类型A', quantity: 1200, operator: '操作员A' },
  { id: 2, machineNo: 'M20240001', eventType: '维护', eventDate: '2024-03-28', productName: '-', quantity: 0, operator: '维护员A' },
  { id: 3, machineNo: 'M20240001', eventType: '检验', eventDate: '2024-03-25', productName: '-', quantity: 0, operator: '质检员A' }
]

// 追溯查询结果
export const traceSearchResult = {
  planNo: 'P2024-01',
  productName: '类型A',
  productionDate: '2024-04-01',
  components: [
    { componentNo: 'C001', componentName: 'ECU控制器', supplier: '宏伟供应商', batchNo: 'B20240401' },
    { componentNo: 'C002', componentName: '电池包', supplier: '振兴供应商', batchNo: 'B20240402' }
  ],
  machines: ['M20240001', 'M20240003'],
  output: 2300,
  qualified: 2270
}
