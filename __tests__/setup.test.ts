describe('Test Setup', () => {
  it('should run a basic test', () => {
    expect(true).toBe(true);
  });

  it('should have localStorage mock', () => {
    expect(localStorage).toBeDefined();
    expect(localStorage.getItem).toBeDefined();
    expect(localStorage.setItem).toBeDefined();
  });

  it('should have matchMedia mock', () => {
    expect(window.matchMedia).toBeDefined();
  });
});
