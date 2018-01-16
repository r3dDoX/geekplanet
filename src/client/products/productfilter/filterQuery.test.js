import * as underTest from './filterQuery';

describe('FilterQuery', () => {
  describe('addProducer', () => {
    it('should add producer to query', () => {
      const query = '?notProducers=blubb';

      const result = underTest.addProducer({ _id: 'myProducerId' }, query);

      expect(result).toContain('notProducers=blubb');
      expect(result).toContain('&');
      expect(result).toContain('producers=myProducerId');
    });

    it('should append producer to already existing producers', () => {
      const query = '?producers=someOtherProducerId';

      const result = underTest.addProducer({ _id: 'myProducerId' }, query);

      expect(result).toContain('producers=someOtherProducerId%2CmyProducerId');
    });
  });

  describe('removeProducer', () => {
    it('should remove producer from query', () => {
      const query = '?producers=someOtherProducerId%2CmyProducerId';

      const result = underTest.removeProducer({ _id: 'myProducerId' }, query);

      expect(result).toContain('producers=someOtherProducerId');
    });

    it('should remove param when no producers left', () => {
      const query = '?producers=myProducerId';

      const result = underTest.removeProducer({ _id: 'myProducerId' }, query);

      expect(result).not.toContain('producers');
    });
  });

  describe('addProductCategory', () => {
    const productCategories = [
      {
        _id: 'myCategoryId',
        subCategories: [{
          _id: 'otherCategoryId',
          subCategories: [],
        }],
      },
      {
        _id: 'someOtherCategoryId',
        subCategories: [],
      },
    ];

    it('should add category to query', () => {
      const query = '?notCategories=blubb';

      const result = underTest.addProductCategory({
        _id: 'otherCategoryId',
        subCategories: [],
      }, query, productCategories);

      expect(result).toContain('notCategories=blubb');
      expect(result).toContain('&');
      expect(result).toContain('categories=otherCategoryId');
    });

    it('should append category to already existing categories', () => {
      const query = '?categories=myCategoryId';

      const result = underTest.addProductCategory({
        _id: 'someOtherCategoryId',
        subCategories: [],
      }, query, productCategories);

      expect(result).toContain('categories=myCategoryId%2CsomeOtherCategoryId');
    });

    it('should not append subcategory of already existing category', () => {
      const query = '?categories=myCategoryId';

      const result = underTest.addProductCategory({
        _id: 'otherCategoryId',
        subCategories: [],
      }, query, productCategories);

      expect(result).toContain('categories=myCategoryId');
    });
  });

  describe('removeProductCategory', () => {
    it('should remove category from query', () => {
      const query = '?categories=myCategoryId%2CsomeOtherCategoryId';

      const result = underTest.removeProductCategory({
        _id: 'myCategoryId',
        subCategories: [],
      }, query);

      expect(result).toContain('categories=someOtherCategoryId');
    });

    it('should remove param when no category left', () => {
      const query = '?categories=myCategoryId';

      const result = underTest.removeProductCategory({
        _id: 'myCategoryId',
        subCategories: [],
      }, query);

      expect(result).not.toContain('categories');
    });
  });
});
