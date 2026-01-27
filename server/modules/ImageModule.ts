export default class ImageModule {
  public static readonly Bucket = class {
    public static readonly Name = "gallery-images";
  };
  public static readonly Table = class {
    public static readonly Name = "Image";
    public static readonly Fields = class {
      public static readonly ROWID = "ROWID";
      public static readonly NAME = "NAME";
      public static readonly FILE_NAME = "FILE_NAME";
      public static readonly CREATEDTIME = "CREATEDTIME";
    };
  };
}
