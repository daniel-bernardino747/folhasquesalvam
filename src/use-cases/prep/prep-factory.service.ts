import { CreatePrepDto, Prep, UpdatePrepDto } from '@core/index';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrepFactoryService {
  createNewPrep(createPrepDto: CreatePrepDto) {
    const newPrep = new Prep();
    newPrep.user_id = createPrepDto.userId;
    newPrep.folder_id = createPrepDto.folderId;

    return newPrep;
  }
  updatePrep(updatePrepDto: UpdatePrepDto) {
    const newPrep = new Prep();
    newPrep.user_id = updatePrepDto.userId;
    newPrep.folder_id = updatePrepDto.folderId;

    return newPrep;
  }
}
