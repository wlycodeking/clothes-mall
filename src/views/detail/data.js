export default { 
  sku: {
    // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
  // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
    tree: [
      {
        k: '颜色',
        k_id: '1',
        v: [
          {
            id: '1',
            name: '标准',
            imgUrl:
              'https://img.yzcdn.cn/upload_files/2017/02/21/FjKTOxjVgnUuPmHJRdunvYky9OHP.jpg!100x100.jpg'
          },
          // {
          //   id: '2',
          //   name: '衬衣',
          //   imgUrl:
          //     'https://img.yzcdn.cn/upload_files/2017/02/21/FjKTOxjVgnUuPmHJRdunvYky9OHP.jpg!100x100.jpg'
          // },
        ],
        k_s: 's1',
        // count: 1,
        // largeImageMode: true,
      },
      {
        k: '尺码',
        k_id: '2',
        v: [
          {
            id: '100',
            name: 'S'
          },
          {
            id: '101',
            name: 'M'
          },
          {
            id: '102',
            name: 'L'
          }
        ],
        k_s: 's2',
        // count: 2
      }
    ],
    // 所有 sku 的组合列表，如下是：白色1、白色2、天蓝色1、天蓝色2
    list: [
      {
        id: 1000,
        price: 12715,
        // discount: 10, 
        s1: '1',
        s2: '100',
        s3: '0',
        s4: '0',
        s5: '0',  
        stock_num: 40, //库存 
        goods_id: 946755
      },
      {
        id: 1002,
        price: 14444,
        // discount: 100, 
        s1: '1',
        s2: '101',
        s3: '0',
        s4: '0',
        s5: '0',  
        stock_num: 50, //库存 
        goods_id: 946755
      },
      {
        id: 1003,
        price: 14444,
        // discount: 100, 
        s1: '1',
        s2: '102',
        s3: '0',
        s4: '0',
        s5: '0',  
        stock_num: 50, //库存 
        goods_id: 946755
      }
    ],
    price: '59.00~178.00',
    stock_num: 90, // 商品总库存
    // none_sku: false,  // 是否无规格商品 
    // hide_stock: false  // 是否隐藏剩余库存
  },
  goods_id: '946755', 
  // quota: , //限购数量 
  quota_used: 0,  //已经购买过的数量
  goods_info: {
    title: '测试商品A',
    picture:
      'https://img.yzcdn.cn/upload_files/2017/03/16/Fs_OMbSFPa183sBwvG_94llUYiLa.jpeg?imageView2/2/w/100/h/100/q/75/format/jpg' 
  },

};
