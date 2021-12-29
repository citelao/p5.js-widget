import * as Monaco from 'monaco-editor';

namespace MonacoInternals {
    /**
    * Expose some internal parts of ITextModel.
    */
    export interface ITextModelInternal {
        readonly _commandManager: ICommandManager;
    }
    
    /**
    * We don't care about the ICommandManager, other than that it has an undoRedoService.
    */
    interface ICommandManager {
        /**
        * We only care whether or not we can undo or redo.
        * 
        * https://github.com/microsoft/vscode/blob/49efe65bc3769cff56182bfd5ce881fa4654ca6a/src/vs/platform/undoRedo/common/undoRedo.ts#L113
        */
        readonly _undoRedoService: {
            /**
            * Can you undo?
            * @param resource model URI
            */
            canUndo(resource: unknown /* Monaco.Uri | UndoRedoSource */): boolean;
            
            /**
            * Can you redo?
            * @param resource model URI
            */
            canRedo(resource: unknown /* Monaco.Uri | UndoRedoSource */): boolean;
        }
    }
}

export default class UndoRedoHelper {
    private readonly _model: Monaco.editor.ITextModel;
    
    constructor(model: Monaco.editor.ITextModel) {
        this._model = model;
    }
    
    public canUndo(): boolean {
        const internalModel = (this._model as unknown as MonacoInternals.ITextModelInternal);
        return internalModel._commandManager._undoRedoService.canUndo(this._model.uri);
    }

    public canRedo(): boolean {
        const internalModel = (this._model as unknown as MonacoInternals.ITextModelInternal);
        return internalModel._commandManager._undoRedoService.canRedo(this._model.uri);
    }
}