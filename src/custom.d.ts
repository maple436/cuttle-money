type RecordItem = {  //自己申明一个类型
  tags: Tag[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: string; //类/构造函数
}

type RootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  currentTag?: Tag;
}
type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => 'success' | 'duplicated';//success 表示成功，duplicated表示重复  '联合类型'
  save: () => void;
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
  remove: (id: string) => boolean;
}
