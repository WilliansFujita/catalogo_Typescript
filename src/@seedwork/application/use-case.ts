export default interface UseCase<Input,OutPut>{
    execute(input: Input):OutPut| Promise<OutPut>
}