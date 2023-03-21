import { Injectable } from '@nestjs/common';
import { Folder, IDataServices } from '@core/index';

@Injectable()
export class FolderUseCases {
  constructor(private dataServices: IDataServices) {}

  getAllFolders(): Promise<Folder[]> {
    return this.dataServices.folders.getAll();
  }

  getFolderById(id: any): Promise<Folder> {
    return this.dataServices.folders.get(id);
  }

  async createFolder(Folder: Folder): Promise<Folder> {
    try {
      const createdFolder = await this.dataServices.folders.create(Folder);

      return createdFolder;
    } catch (error) {
      throw error;
    }
  }

  updateFolder(folderId: string, Folder: Folder): Promise<Folder> {
    return this.dataServices.folders.update(folderId, Folder);
  }
}
