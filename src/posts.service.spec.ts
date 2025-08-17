import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      // реализуйте тест-кейс
      const result = postsService.findMany();
      expect(result).toHaveLength(4);
      expect(result.map(p => p.text)).toEqual(['Post 1', 'Post 2', 'Post 3', 'Post 4']);
    });

    it('should return correct posts for skip and limit options', () => {
      // реализуйте тест-кейс
      const result = postsService.findMany({ skip: 1, limit: 2 });
      expect(result).toHaveLength(2);
      expect(result.map(p => p.text)).toEqual(['Post 2', 'Post 3']);
    });

    // реализуйте недостающие тест-кейсы
    it('should return empty array when skip exceeds posts count', () => {
      const result = postsService.findMany({ skip: 10 });
      expect(result).toHaveLength(0);
    });

    it('should return all available posts when limit exceeds posts count', () => {
      const result = postsService.findMany({ limit: 10 });
      expect(result).toHaveLength(4);
    });

    it('should return correct posts when only skip is specified', () => {
      const result = postsService.findMany({ skip: 2 });
      expect(result).toHaveLength(2);
      expect(result.map(p => p.text)).toEqual(['Post 3', 'Post 4']);
    });

    it('should return correct posts when only limit is specified', () => {
      const result = postsService.findMany({ limit: 3 });
      expect(result).toHaveLength(3);
      expect(result.map(p => p.text)).toEqual(['Post 1', 'Post 2', 'Post 3']);
    });

    it('should return empty array when limit is 0', () => {
      const result = postsService.findMany({ limit: 0 });
      expect(result).toHaveLength(0);
    });

    it('should return empty array when skip equals posts count', () => {
      const result = postsService.findMany({ skip: 4 });
      expect(result).toHaveLength(0);
    });

    it('should return last post when skip is posts count - 1 and limit is 1', () => {
      const result = postsService.findMany({ skip: 3, limit: 1 });
      expect(result).toHaveLength(1);
      expect(result[0].text).toBe('Post 4');
    });
  });
});