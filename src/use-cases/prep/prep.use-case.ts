import { Injectable } from '@nestjs/common';
import { Prep, IDataServices } from '@core/index';

@Injectable()
export class PrepUseCases {
  constructor(private dataServices: IDataServices) {}

  getAllPreps(): Promise<Prep[]> {
    return this.dataServices.preps.getAll();
  }

  getPrepById(id: any): Promise<Prep> {
    return this.dataServices.preps.get(id);
  }

  async createPrep(prep: Prep): Promise<Prep> {
    try {
      const createdprep = await this.dataServices.preps.create(prep);

      return createdprep;
    } catch (error) {
      throw error;
    }
  }

  updatePrep(prepId: string, prep: Prep): Promise<Prep> {
    return this.dataServices.preps.update(prepId, prep);
  }
}
