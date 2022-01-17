import { validators } from '../../../src/components/AppendItemModal/validators';

describe('Given AppendItemModal validators schema', () => {
    describe('when executed on form data with missing inputValue', () => {
        it('should produce "Required" error message', async () => {
            try {
                await validators.validate({});
            } catch (error: any) {
                expect(error.errors).toEqual(['Required']);
            }
        });
    });

    describe('when inputValue does NOT contain any letters nor digits', () => {
        it('should produce correct error message', async () => {
            try {
                await validators.validate({ inputValue: '!@#$___^$%#' });
            } catch (error: any) {
                expect(error.errors).toEqual([
                    'Kryterium musi zawierać choć jedną literę lub cyfrę',
                ]);
            }
        });
    });

    describe('when inputValue contains at least one letter', () => {
        it('should return the provided object', async () => {
            expect(
                await validators.validate({ inputValue: '___A___' })
            ).toEqual({ inputValue: '___A___' });
        });
    });

    describe('when inputValue contains at least one digit', () => {
        it('should return the provided object', async () => {
            expect(
                await validators.validate({ inputValue: '___1___' })
            ).toEqual({ inputValue: '___1___' });
        });
    });
});
