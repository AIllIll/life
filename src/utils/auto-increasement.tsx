const useAutoIncreasement: Function = (
    begin: number = 0,
    increasement: number = 1
) => {
    let num = begin;
    return () => {
        num += increasement;
        return num;
    };
};
export default useAutoIncreasement;
