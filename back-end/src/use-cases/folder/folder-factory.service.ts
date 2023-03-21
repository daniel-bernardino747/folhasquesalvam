import { CreateFolderDto, Folder, UpdateFolderDto } from '@core/index';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FolderFactoryService {
  createNewFolder(createFolderDto: CreateFolderDto) {
    const newFolder = new Folder();
    newFolder.user_id = createFolderDto.userId;
    newFolder.size = createFolderDto.size;
    newFolder.content = createFolderDto.content;

    return newFolder;
  }
  updateFolder(updateFolderDto: UpdateFolderDto) {
    const newFolder = new Folder();
    newFolder.user_id = updateFolderDto.userId;
    newFolder.size = updateFolderDto.size;
    newFolder.content = updateFolderDto.content;

    return newFolder;
  }
}
