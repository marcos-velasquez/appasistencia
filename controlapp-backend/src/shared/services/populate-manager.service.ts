import { PopulateOptions, Document } from 'mongoose';

export class PopulateManager {
  constructor(private populate: PopulateOptions | PopulateOptions[]) {}

  exec(document: Document | Document[]) {
    return Array.isArray(document) ? this.toArray(document) : this.toObject(document);
  }

  private async toArray(documents: Document[]) {
    for (const doc of documents) {
      await this.toObject(doc);
    }
    return documents;
  }

  private async toObject(document: Document) {
    return document.populate(this.populate);
  }
}
